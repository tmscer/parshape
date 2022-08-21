import { Checkbox, FormControlLabel } from "@mui/material";

export default function LabeledCheckbox({ label, checked, onChange }) {
  const control = (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      inputProps={{ "aria-label": "controlled" }}
    />
  );

  return <FormControlLabel control={control} label={label} />;
}
