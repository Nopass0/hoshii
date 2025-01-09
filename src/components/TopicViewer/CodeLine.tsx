import React from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type CodeLineProps = {
  line: LineType;
};

const CodeLine: React.FC<CodeLineProps> = ({ line }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(line.code || "");
    toast({
      title: "Code copied to clipboard!",
      variant: "success",
    });
  };

  return (
    <motion.div
      className={`flex flex-col gap-2 p-2 rounded-md ${line.backgroundColor ? `bg-${line.backgroundColor}` : "bg-card/90"}`}
      style={{
        color: line.color || "inherit",
        marginBottom: line.marginBottom || "0",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {line.type === "code" && (
        <div className="relative">
          <pre className="whitespace-pre-wrap break-all text-foreground">
            <code>{line.code}</code>
          </pre>
          <button
            className="absolute top-2 right-2 bg-popover text-popover-foreground hover:bg-popover hover:text-popover-foreground p-1 rounded-full"
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
          >
            <Copy />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default CodeLine;
