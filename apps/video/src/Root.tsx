import { Composition } from "remotion";

import { Burger } from "./compositions/redo/Burger";
import { BurgerV2 } from "./compositions/redo/BurgerV2";
import { BurgerV3 } from "./compositions/redo/BurgerV3";
import { BurgerV4 } from "./compositions/redo/BurgerV4";
import { Waves } from "./compositions/redo/Waves";
import { WavesV2 } from "./compositions/redo/WavesV2";
import { FlikC } from "./compositions/redo/FlikC";
import { FlikCV2 } from "./compositions/redo/FlikCV2";
import { FlikCV3 } from "./compositions/redo/FlikCV3";
import { FlikCV4 } from "./compositions/redo/FlikCV4";
import { FlikC_Portrait } from "./compositions/redo/FlikC_Portrait";
import { FlikCV2_Portrait } from "./compositions/redo/FlikCV2_Portrait";
import { FlikCV3_Portrait } from "./compositions/redo/FlikCV3_Portrait";
import { FlikCV4_Portrait } from "./compositions/redo/FlikCV4_Portrait";
import { Kaleidoscope } from "./compositions/redo/Kaleidoscope";

export const Root: React.FC = () => {
  return (
    <>
      {/* Burger (needs redo) */}
      <Composition id="Burger" component={Burger} durationInFrames={600} fps={30} width={1920} height={1080} />
      <Composition id="BurgerV2" component={BurgerV2} durationInFrames={600} fps={30} width={2160} height={3600} />
      <Composition id="BurgerV3" component={BurgerV3} durationInFrames={600} fps={30} width={1920} height={1080} />
      <Composition id="BurgerV4" component={BurgerV4} durationInFrames={600} fps={30} width={2160} height={3600} />

      {/* Waves (needs redo) */}
      <Composition id="Waves" component={Waves} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="WavesV2" component={WavesV2} durationInFrames={450} fps={30} width={2160} height={3600} />

      {/* FlikC — first round (kept, semi-decent) */}
      <Composition id="FlikC" component={FlikC} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="FlikCV2" component={FlikCV2} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="FlikCV3" component={FlikCV3} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="FlikCV4" component={FlikCV4} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="FlikC-Portrait" component={FlikC_Portrait} durationInFrames={450} fps={30} width={2160} height={3600} />
      <Composition id="FlikCV2-Portrait" component={FlikCV2_Portrait} durationInFrames={450} fps={30} width={2160} height={3600} />
      <Composition id="FlikCV3-Portrait" component={FlikCV3_Portrait} durationInFrames={450} fps={30} width={2160} height={3600} />
      <Composition id="FlikCV4-Portrait" component={FlikCV4_Portrait} durationInFrames={450} fps={30} width={2160} height={3600} />

      {/* Kaleidoscope — first round (kept) */}
      <Composition id="Kaleidoscope" component={Kaleidoscope} durationInFrames={900} fps={30} width={1080} height={1080} />
    </>
  );
};
