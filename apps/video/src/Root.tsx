import { Composition } from "remotion";
import { Main } from "./compositions/Main";
import { WordmarkIntro } from "./compositions/WordmarkIntro";
import { FontPreviewShowcase } from "./compositions/FontPreviewShowcase";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WordmarkIntro"
        component={WordmarkIntro}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FontPreviewShowcase"
        component={FontPreviewShowcase}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1350}
      />
    </>
  );
};
