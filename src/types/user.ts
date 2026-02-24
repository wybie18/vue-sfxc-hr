export interface Address {
    id: number
    address_type: string
    street_address: string
    barangay: string
    city: string
    province: string
    postal_code: string
    country: string
    is_current: boolean
}

export interface ContactInformation {
    id: number
    contact_type: string // e.g., 'mobile', 'landline'
    contact_value: string
    is_primary: boolean
    is_verified: boolean
}

export interface Person {
    id: number
    first_name: string
    middle_name: string | null
    last_name: string
    suffix: string | null
    full_name: string
    formal_name: string
    date_of_birth: string | null
    gender: string
    nationality: string
    civil_status: string
    profile_photo_path: string | null

    contact_information?: ContactInformation[]
    addresses?: Address[]
}

export interface Permission {
    id: number
    name: string
    slug: string
    module: string
    description: string | null
}

export interface Role {
    id: number
    name: string
    slug: string
    description: string | null
    permissions?: Permission[]
}

export interface User {
    id: number
    rfid_uid: string | null
    email: string
    email_verified_at: string | null
    is_active: boolean
    last_login_at: string | null
    created_at: string
    updated_at: string

    person?: Person
    roles?: Role[]
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface LoginResponse {
    user: User
    token: string
}
