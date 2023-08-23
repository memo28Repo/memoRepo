interface versionLogTypes {
  name: string | number;
  version: string | number;
}




export function versionLog(opt: versionLogTypes) {
  console.log(
    `%c ${opt.name} %c Detected v${opt.version} %c`,
    "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#CC3574 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent"
  );
}
