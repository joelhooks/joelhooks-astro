import MuxPlayer from "@mux/mux-player-react";

interface MuxVideoProps {
  playbackId: string;
  title?: string;
  aspectRatio?: string;
}

export default function MuxVideo({ playbackId, title, aspectRatio = "16/9" }: MuxVideoProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{
        video_title: title || "Video",
      }}
      accentColor="#10b981"
      style={{ 
        width: aspectRatio === "9/16" ? "auto" : "100%",
        maxWidth: aspectRatio === "9/16" ? "350px" : "100%",
        aspectRatio,
        margin: "0 auto"
      }}
    />
  );
}
