import CopyIcon from "@mui/icons-material/CopyAllRounded";
import { Button } from "@mui/material";
import { forwardRef, useCallback, useRef } from "react";

export default function CopyToClipboardButton({ value, onClick }) {
  const ref = useRef();

  const copyText = useCallback(() => {
    // input hasn't rendered yet
    if (!ref.current) {
      return;
    }

    ref.current.select();
    document.execCommand("copy");
    ref.current.blur();
  }, [ref]);

  const onCopy = useCallback(
    (event) => {
      copyText();

      if (Boolean(onClick)) {
        onClick(event);
      }
    },
    [copyText, onClick]
  );

  return (
    <>
      <Button variant="outlined" onClick={onCopy}>
        <FakeInput ref={ref} value={value} />
        <CopyIcon sx={{ mr: 1, ml: -1.5 }} />
        Copy to clipboard
      </Button>
    </>
  );
}

const FakeInput = forwardRef(function FakeInput({ value }, ref) {
  // We need to use `<textarea />` because regular `<input />`
  // would remove newlines
  return (
    <textarea
      ref={ref}
      style={{
        pointerEvents: "none",
        width: "1px",
        height: "1px",
        opacity: 0,
        marginRight: "-1px",
      }}
      readOnly
      value={value}
    />
  );
});
