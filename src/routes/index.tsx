import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SARC · IIT Bombay" },
      { name: "description", content: "Student Alumni Relations Cell, IIT Bombay — connecting students and alumni since 2008." },
      { property: "og:title", content: "SARC · IIT Bombay" },
      { property: "og:description", content: "Student Alumni Relations Cell, IIT Bombay — connecting students and alumni since 2008." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SARC · IIT Bombay" },
      { name: "twitter:description", content: "Student Alumni Relations Cell, IIT Bombay — connecting students and alumni since 2008." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/sarc.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#05070f", color: "#e7ecf7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
      Loading SARC…
    </div>
  );
}
