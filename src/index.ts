declare const window: any;

export const Greeter = (name: string) => `Hello ${name}`
export const ButtonClicked = () => {
    window.ethereum.enable()
}
