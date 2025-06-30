import { Button, type ButtonProps } from "@mui/material"
import type { ReactNode } from "react";


export type VessButtonProps = ButtonProps & {
  children?: ReactNode;
};

export const VessBackButton: React.FC<VessButtonProps> = ({ sx, children, ...props }) => (
  <Button
    {...props}
    sx={{
      py: 1.5,
      backgroundColor: "rgba(0, 0, 0, 0.14)",
      color: "#f2e2b3",
      fontWeight: 600,
      borderRadius: 1,
      transition: "transform 0.5s ease-in-out",
      "&:hover": {
        transform: "scale(1.01)",
      },
      "&:focus": {
        outline: "none",
      },
      ...sx,
    }}
  >
    {children}
  </Button>
);
