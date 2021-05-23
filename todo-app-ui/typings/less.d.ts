declare module "*.less" {
    const styles: { [className: string]: string };
    export = styles;
}

declare module "*.css" {
    const styles: { [className: string]: string };
    export = styles;
}
