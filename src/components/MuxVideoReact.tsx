import MuxPlayer from "@mux/mux-player-react";

interface MuxVideoProps {
  playbackId: string;
  title?: string;
  aspectRatio?: string;
}

export default function MuxVideo({ playbackId, title, aspectRatio = "16/9" }: MuxVideoProps) {
  const isVertical = aspectRatio === "9/16";
  
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
      margin: "2rem 0"
    }}>
      <MuxPlayer
        playbackId={playbackId}
        metadata={{
          video_title: title || "Video",
        }}
        accentColor="#10b981"
        style={{ 
          width: isVertical ? "min(350px, 100%)" : "100%",
          aspectRatio,
        }}
      />
    </div>
  );
}
