import React from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Globe } from "lucide-react";
import { Metadata } from "next";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Currículo | Igor Kendy Sakaguchi",
  description: "Currículo de Igor Kendy Sakaguchi - Full-Stack & DevOps Engineer",
};

import { ResumeContent } from "./ResumeContent";

export default function ResumePage() {
  return <ResumeContent />;
}
