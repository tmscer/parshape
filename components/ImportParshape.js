import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import parseParshape from "../utils/parseParshape";

export default function ImportParshape({ setLines, settings }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [parshape, setParshape] = useState("");

  const numTextLines = useMemo(() => parshape.split("\n").length, [parshape]);

  const onConfirm = useCallback(() => {
    try {
      const parsedParagraphLines = parseParshape(parshape, {
        hsize: settings.hsize,
      });

      setError(null);
      setLines(parsedParagraphLines);
      setOpen(false);
    } catch (error) {
      setError(error);
    }
  }, [parshape, setLines, settings.hsize]);

  return (
    <Stack direction="column">
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Import \parshape
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Import an existing <tt>\parshape</tt> command
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Importing supports limited TeX syntax. For example groups
            aren&apos;t supported but units listed{" "}
            <a
              href="https://en.wikibooks.org/wiki/TeX/TeX_dimensions"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>{" "}
            except <tt>em</tt> and <tt>ex</tt> are. Outputs from this project
            will always be supported.
          </Alert>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}
          <textarea
            style={{ width: "100%", resize: "vertical" }}
            value={parshape}
            rows={`${Math.max(numTextLines + 5, 5)}`}
            spellCheck={false}
            onChange={(e) => setParshape(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => onConfirm()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
