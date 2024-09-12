export type HostType = {
    id: string,
    name: string,
    email: string,
    image_url: string,
    bio ?: string,
    githubId ?: string,
    githubImageUrl ?: string
}
export type SessionsType = {
    id: string,
    name: string,
    hostId: HostType
    githubRepo?: string,
    details?: string,
    status:string,
    inviteUrl?: string,
}
export type UserType = {
    id: string,
    name: string,
    email: string,
    image_url: string,
    bio: string | null,
    githubId: string | null,
    githubImageUrl: string | null,
    skills: string | null
}