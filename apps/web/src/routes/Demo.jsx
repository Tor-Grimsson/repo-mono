import TextPressure from '../components/react-bits/TextPressure';
import MagnetLines from '../components/react-bits/MagnetLines';

export default function Demo() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col gap-16 items-center justify-center p-8">
      {/* <div style={{ width: '80vw', height: '50vh' }}>
        <TextPressure
          text="KOLKRABBI"
          fontFamily="TG Root-Tune"
          fontUrl="/fonts/TGRoot-TuneVF.ttf"
          textColor="#ffffff"
          strokeColor="#5227ff"
          stroke={false}
          flex={true}
          width={true}
          weight={true}
          italic={true}
        />
      </div> */}

      <MagnetLines
        rows={9}
        columns={9}
        containerSize="60vmin"
        lineColor="#ffffff"
        lineWidth="0.8vmin"
        lineHeight="5vmin"
        baseAngle={0}
      />
    </div>
  );
}
