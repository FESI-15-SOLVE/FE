import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

function Badge({
  className,

  render,
  ...props
}: useRender.ComponentProps<"span">) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({ className }, props),
    render,
    state: {
      slot: "badge",
    },
  });
}

export { Badge };
