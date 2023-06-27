import { useState, useEffect } from 'react';

import { request } from '../utils/request';

type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    }
};

export type User = {
    id: number;
    name?: string;
    username: string;
    email: string;
    address?: Address
    phone: string;
    website?: string;
    company?: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

type useUsers = {
   data: User[];
   isLoading: boolean; 
   error: string | null;
   addNewUser: (user: User) => void;
   deleteUsers: (users: User[]) => void;
}

export function useUsers(): useUsers {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const dataFetch = async () => {
            setIsLoading(true);
            try {
                const users = await request<User[]>('https://jsonplaceholder.typicode.com/users');
                setIsLoading(false);
                setData(users)
              }
              catch (error) {
                setError('Error: during request!');
              }
        };

        dataFetch();
    }, []);
    
    return {
        data,
        isLoading,
        error,
        addNewUser: (newUser: User) => {
            setData([...data, newUser]);
        },
        deleteUsers: (users: User[]) => {
            const deletedIds = users.map((user) => user.id);
            const filteredUsers = data.filter((user) => !deletedIds.includes(user.id));
            setData(filteredUsers);
        }
    };
}