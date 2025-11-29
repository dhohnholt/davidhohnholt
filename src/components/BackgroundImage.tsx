export default function BackgroundImage({ url }: { url: string }) {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center scale-105 blur-[3px] opacity-40"
      style={{ backgroundImage: `url('${url}')` }}
    />
  );
}
