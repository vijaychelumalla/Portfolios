export default function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.04),transparent_60%)]" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* Light beams */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute -top-[50%] left-[25%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent rotate-[30deg] blur-[1px]"
          style={{ animation: "pulse 10s ease-in-out infinite" }}
        />
        <div 
          className="absolute -top-[50%] right-[35%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent rotate-[30deg] blur-[1px]"
          style={{ animation: "pulse 14s ease-in-out infinite", animationDelay: "3s" }}
        />
      </div>

      {/* Blob 1 */}
      <div 
        className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-blue-600/10 blur-[120px] animate-blob" 
        style={{ animationDuration: "18s" }}
      />
      {/* Blob 2 */}
      <div 
        className="absolute top-[50%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[140px] animate-blob"
        style={{ animationDuration: "25s", animationDelay: "2s" }}
      />
      {/* Blob 3 */}
      <div 
        className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-blue-800/10 blur-[100px] animate-blob"
        style={{ animationDuration: "20s", animationDelay: "5s" }}
      />
    </div>
  );
}
