import type { UserDto } from 'src/services/ApiClient'

export type AuthContextType = {
    user: UserDto | null
    login: () => Promise<void>
    logout: () => Promise<void>
    setUser: (user: UserDto | null) => void
    loading: boolean
}
