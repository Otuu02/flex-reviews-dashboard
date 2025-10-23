export default function Home() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontSize: "24px"
    }}>
      Redirecting...
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.href='/dashboard';`
        }}
      />
    </div>
  );
}