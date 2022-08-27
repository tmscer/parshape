// Positioning was inspired by http://petr.olsak.net/ftp/olsak/optex/tex-nutshell.pdf page 2,
// some dimensions had to be changed to visually match TeX tho
export default function TeX() {
  return (
    <span
      style={{
        fontFamily: "serif",
        whiteSpace: "nowrap",
        marginRight: "-0.4em",
      }}
    >
      T<E />
      <X />
    </span>
  );
}

function E() {
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        left: "-0.1667em",
        top: "0.25em",
      }}
    >
      E
    </div>
  );
}

function X() {
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        left: "-0.35em",
      }}
    >
      X
    </div>
  );
}
