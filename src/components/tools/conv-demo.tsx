"use client";

import { AnimatedTerminal } from "@/components/shared/animated-terminal";

/**
 * Animated terminal demo for ruah-conv.
 * Output matches the real `ruah conv inspect petstore.yaml` command.
 */

const COMMAND = "ruah conv inspect petstore.yaml";

const OUTPUT = [
  { text: "" },
  { text: "Petstore API", className: "text-cyan-400 font-bold text-[14px]", delay: 120 },
  { text: "──────────────────────────────────────────────────", delay: 40 },
  { text: "  Title:      Petstore API", delay: 60 },
  { text: "  Version:    1.0.0", delay: 40 },
  { text: "  Format:     openapi-3.0", delay: 40 },
  { text: "  Base URL:   https://api.petstore.example.com/v1", delay: 40 },
  { text: "" },
  { text: "Auth Schemes (1)", delay: 100 },
  { text: "  • apiKeyAuth: apiKey (X-API-Key)", delay: 60 },
  { text: "" },
  { text: "Tools (4)", delay: 100 },
  { text: "  • listPets   GET    /pets          (2 params)", delay: 80 },
  { text: "  • createPet  POST   /pets          (0 params +body) [moderate]", delay: 80 },
  { text: "  • getPet     GET    /pets/{petId}  (1 params)", delay: 80 },
  { text: "  • deletePet  DELETE /pets/{petId}  (1 params) [destructive]", delay: 80 },
  { text: "" },
  { text: "Types (3)", delay: 100 },
  { text: "  Pet, NewPet, Error", delay: 60 },
];

interface ConvDemoProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
}

export function ConvDemo({ className, delay = 0 }: ConvDemoProps) {
  return (
    <AnimatedTerminal
      command={COMMAND}
      output={OUTPUT}
      title="@ruah-dev/conv"
      className={className}
      typingSpeed={35}
      outputDelay={500}
      loopDelay={8000}
      delay={delay}
    />
  );
}
