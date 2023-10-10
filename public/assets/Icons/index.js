import { memo } from "react";
import IcoMoon from "react-icomoon";
const iconSet = require("./selection.json");


const Icon = ({ ...props }) => {
     return <IcoMoon iconSet={iconSet} className="icon" {...props} />;
};

export default memo(Icon);