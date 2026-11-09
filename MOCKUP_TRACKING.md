# Design Forge Portfolio — Mockup Tracking Ledger

This ledger acts as the single source of truth for all projects in the Design Forge portfolio website. Non-mockup designs have been removed so the portfolio exclusively features verified, real-world mockups with accurate metadata.

---

## 📊 Summary Status

- **Active Portfolio Works**: 13 (100% Mockups)
- **Non-Mockup Designs**: Removed
- **Client Roster Updated**: Added **Opticlick** (with vector logo)
- **Branding Mistakes Project**: Fully removed
- **Mockups Directory**: `public/assets/mockups/`
- **Master High-Res Originals**: `public/assets/mockups/raw/`

---

## ✅ Active Works (100% Mockup Verified with Accurate Information)

| ID | Title | Category | Client | Mockup Image File | Visual Verification & Accurate Metadata |
|:---:|:---|:---|:---|:---|:---|
| **8** | Elysium Logo | Logos | Elysium | `Design Forge Brand Kit (7).jpg` | Burgundy polo shirt with embroidered circular Elysium logo mark on chest. |
| **15** | Oh Wow Gifts Logo | Logos | Oh Wow Gifts | `Oh Wow Gifts.png` | Circular hanging outdoor blade sign on storefront brick facade. |
| **5** | T-Shirt Designs | Branding | Namespace BPIT | `Design Forge Brand Kit (4).jpg` | Model wearing black t-shirt with white "JUNIOR COUNCIL 2025" 3D cube graphics. |
| **7** | Personalised Gifts | Branding | Oh Wow Gifts | `Oh wow Gifts Post.jpg` | Tabletop studio merchandise set featuring custom mug, craft gift box, and tote bags. |
| **2** | Festival Story Design | Digital | Rotaract District 3012 | `Design Forge Brand Kit (6).jpg` | Smartphone in hand displaying festive Ganesh Chaturthi Instagram story template. |
| **6** | Safdurjung Photowalk | Digital | Opticlick | `PHOTOWALK (1).jpg` | Monochromatic architectural event poster on easel: "Opticlick Safdurjung Tomb - The Finale (20 Sep)". |
| **10** | Cirola Pamphlet | Print | Ciróla | `Design Forge Brand Kit (9).jpg` | Printed fresh-produce commercial pamphlet held in hands: "Ciróla - Your Quality Partner for Every Plate". |
| **11** | Aggarwal PG | Print | Aggarwal Living | `Aggarwal PG.jpg` | Printed hospitality identity cards on marble table: "Aggarwal PG - Premium Living Peaceful Stay". |
| **26** | Aggarwal Living Mural | Branding | Aggarwal Living | `aggarwal living mockup.jpg` | Reception lobby modular jigsaw puzzle wall mural showcasing 16 student housing amenities. |
| **12** | Darima Cheese | Print | Darima Cheese | `cirola.jpg` | Handcrafted gourmet cheese flyer held in hands: "Crafted to Impress - Darima Cheese". |
| **3** | Take A Brain Break | Print | Mental Health Initiative | `Design Forge Brand Kit (5).jpg` | "TAKE A BRAIN BREAK - Mental Health" card with red envelope stationery. |
| **9** | Quantum Cybershield | Print | BPIT Research | `Design Forge Brand Kit (3).jpg` | Framed academic wall poster: "Quantum Cybershield - Securing The Future (NSQP 2.0 / Team Spark)". |
| **20** | Education Poster | Print | S.D. Public School | `Design Forge Brand Kit (8).jpg` | Framed civic educational infographic poster in architectural natural wood frame. |

---

## 🗑️ Removed Non-Mockup Designs

The following 13 projects were removed from the live portfolio:
- **1** - Chocworks Menu
- **4** - Wedding Invitation
- **13** - Modern Logo
- **14** - Brand Identity Logo
- **16** - Appreciation Cert.
- **17** - College Certificate
- **18** - APIs Explained
- **19** - Branding Mistakes *(Removed)*
- **21** - Abstract Poster I
- **22** - Abstract Poster II
- **23** - Abstract Poster III
- **24** - Abstract Poster IV
- **25** - Abstract Poster V

---

## 🔄 Adding More Mockups in Future Turns

When you add new mockup files into `public/assets/mockups/`:
1. Drop the image file into `public/assets/mockups/`.
2. Tell me the name of the work or let me inspect the image visually.
3. I will optimize the web asset, add it into `FORGE_PROJECTS` in [`forgeData.ts`](file:///d:/Yash%20Vasudeva/Design%20Forge%20Portfolio/src/data/forgeData.ts), and update this ledger.
