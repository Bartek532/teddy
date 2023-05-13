import { lazy, memo } from "react";

import type { IconBaseProps, IconType } from "react-icons/lib";

interface IconProps {
  name: string;
  props?: IconBaseProps;
}

export const Icon = memo<IconProps>(({ name, props }) => {
  const lib = name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(" ")[0]
    .toLocaleLowerCase();

  const ElementIcon = lazy(() =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    import(`react-icons/${lib}/index.js`).then((mod) => mod[name]),
  ) as IconType;

  return <ElementIcon {...props} />;
});

Icon.displayName = "Icon";
