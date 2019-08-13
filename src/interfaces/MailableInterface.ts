declare interface MailableInterface {
    send?: () => {};
    build?: (to: string) => this;
}

export default MailableInterface;
