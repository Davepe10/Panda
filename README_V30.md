# Pandalandia V30 — Premium App + Cocker Sculpt

- Uses the two STL Cocker meshes supplied in the conversation as the new visual base.
- Standing sculpt is reduced from 300k to ~52k triangles for the interactive room.
- Sitting sculpt is reduced from 300k to ~55k triangles and used for sit/rest/care states.
- Both are converted to local GLB files; no runtime model download is required.
- Cocker rendering uses PBR fur material and full-body camera framing.
- The app shell and World screen are rebuilt mobile-first to look and behave like an installed app, with safe-area support, edge-to-edge pet scene, compact HUD, action dock, and premium bottom navigation.
- Canvas never owns vertical scrolling.
- Audio playback adds subtle randomized pitch and filtering so repeated dog actions do not sound identical.
- No SQL migration is required from V29.

Important: the supplied STL files contain high-detail static geometry but no skeleton or animation clips. V30 uses the standing/sitting meshes plus whole-body procedural motion for actions. True articulated walking/eating at professional game quality still requires a rigged model or rigging these meshes in a DCC tool such as Blender.
