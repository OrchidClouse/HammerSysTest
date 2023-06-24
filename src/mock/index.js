
import { createServer } from 'miragejs'
import { API_BASE_URL } from 'configs/AppConfig';

import { signInUserData } from './data/authData'
import { userData } from "./data/userData";

import { authFakeApi } from './fakeApi'

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
			server.db.loadData({
				signInUserData
        // userData
			})
		},
        routes() {
            this.urlPrefix = ''
            this.namespace = ''

            this.passthrough(request => {
                const isExternal = request.url.startsWith('http')
                return isExternal
            })

            this.get("/api/users", userData)

            this.passthrough()

            authFakeApi(this, API_BASE_URL)
        },
    })
}