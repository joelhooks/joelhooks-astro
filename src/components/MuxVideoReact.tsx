import MuxPlayer from "@mux/mux-player-react";

interface MuxVideoProps {
  playbackId: string;
  title?: string;
}

export default function MuxVideo({ playbackId, title }: MuxVideoProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{
        video_title: title || "Video",
      }}
      accent-color="#10b981"
      style={{ width: "100%", aspectRatio: "16/9" }}
    />
  );
}
