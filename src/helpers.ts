export function getCurrentFileType(session: any){
    const sessionNme = session.getMode().$id;
    const sessionNmeParts = sessionNme.split("/");
    return sessionNmeParts[sessionNmeParts.length - 1];
}