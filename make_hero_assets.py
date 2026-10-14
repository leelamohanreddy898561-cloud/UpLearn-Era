from PIL import Image, ImageDraw, ImageFilter
import numpy as np
from scipy import ndimage

raw = Image.open("public/banner.jpg").convert("RGB")
banner = raw.crop((0, 16, 2120, 334))

person = banner.crop((1120, 0, 1660, 318))
w, h = person.size
arr = np.array(person).astype(int)

# background colour key (exact navy = background)
edge = np.concatenate([arr[:, :8].reshape(-1, 3), arr[:, -8:].reshape(-1, 3)])
bgcol = np.median(edge, axis=0)
dist = np.sqrt(((arr - bgcol) ** 2).sum(axis=2))
binm = Image.fromarray(((dist < 62) * 255).astype("uint8"))
for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (0, h // 2), (w - 1, h // 2)]:
    ImageDraw.floodfill(binm, seed, 128, thresh=50)
fg = np.array(binm) != 128

# person silhouette (hand-traced, follows the arm so the light-trail arc
# and the HUD icons fall outside)
poly = [
    (72, 20), (96, 6), (150, 0), (196, 18), (202, 62), (228, 92),
    (262, 138), (292, 168), (322, 208), (337, 252), (332, 296),
    (318, 316), (250, 317), (170, 317), (108, 315), (76, 298),
    (56, 272), (50, 226), (54, 186), (60, 152), (66, 104), (69, 58),
]
mask = Image.new("L", (w, h), 0)
ImageDraw.Draw(mask).polygon(poly, fill=255)
fg = fg & (np.array(mask) > 110)

# punch out the known HUD icon boxes (gear, robot, chart)
for box in [(262, 0, 420, 150), (415, 55, 540, 245), (0, 185, 55, 318)]:
    x0, y0, x1, y1 = box
    fg[y0:y1, x0:x1] = False

# remove the light-trail arc where it crosses the right shoulder: inside
# this zone keep only skin / navy-shirt colours
r_, g_, b_ = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
sum_ = r_ + g_ + b_
skin = (r_ > g_ + 12) & (g_ > b_ + 5) & (r_ > 90)
navy = (sum_ < 155) & (b_ >= r_ + 12)
person_like = skin | navy
bx0, by0, bx1, by1 = 245, 130, 370, 265
box = fg[by0:by1, bx0:bx1]
box = box & person_like[by0:by1, bx0:bx1]
fg[by0:by1, bx0:bx1] = box

# keep the largest component, close gaps, fill holes
lab, n = ndimage.label(fg)
if n:
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
    fg = lab == (int(np.argmax(sizes)) + 1)

# erode away thin leftover structures (the light-trail arc), then restore
# the body volume
fg = ndimage.binary_erosion(fg, iterations=4)
fg = ndimage.binary_dilation(fg, iterations=4)
fg = ndimage.binary_closing(fg, structure=np.ones((5, 5)), iterations=2)
fg = ndimage.binary_fill_holes(fg)

a = Image.fromarray((fg * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.4))
out = person.convert("RGBA")
out.putalpha(a)
out.save("public/hero-person.png")
print("hero-person.png", out.size, "comps:", n)

pv = Image.new("RGB", (900, 480), (13, 27, 56))
ph = 460
pw = int(out.width * ph / out.height)
p = out.resize((pw, ph), Image.LANCZOS)
pv.paste(p, (900 - pw - 40, 480 - ph), p)
pv.save("temp_person_preview.png")
print("preview saved")
