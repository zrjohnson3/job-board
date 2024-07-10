// import React from "react";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";

// interface LoadingButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   loading: boolean;
// }

// // LoadingButton component that takes a loading prop and displays a loading spinner when the prop is true
// export default function LoadingButton({
//   children,
//   loading,
//   ...props
// }: LoadingButtonProps) {
//   return (
//     <Button
//       type="submit"
//       className="rounded px-4 py-2 font-bold text-white"
//       {...props}
//     >
//       <span className="flex items-center justify-center bg-primary">
//         {loading && <Loader2 size={5} className="animate-spin" />}
//         {children}
//       </span>
//     </Button>
//   );
// }

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      type="submit"
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      variant="secondary"
      {...props}
    >
      <span className="flex items-center justify-center">
        {loading && <Loader2 size={20} className="mr-2 animate-spin" />}
        {children}
      </span>
    </Button>
  );
}
