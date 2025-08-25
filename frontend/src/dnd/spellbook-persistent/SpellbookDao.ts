import { Spellbook } from "@voidconcept/shared";
import { getToken } from "../../oauth/oauthClient";

export interface SpellbookDao {
    get(id: string): Promise<Spellbook | null>
    update(id: string, spellbook: Spellbook): Promise<Spellbook | null>
}

export class SpellbookDaoImpl implements SpellbookDao {
    private spellbookUrl = "https://graphql.voidconcept.com/graphql"

    private getQuery = `
query Spellbook($id: ID!) {
    spellbook(id: $id) {
        ownerId
        name
        maxPrepared
        spells {
            name
            level
            school
            description
            higherLevel
            concentration
            ritual
            alwaysPrepared
            castTime {
                type
                duration
            }
            range {
                range
                distance
            }
            areaOfEffect {
                type
                dimensions
            }
            duration {
                type
                duration
            }
            components {
                verbal
                somatic
                material
            }
        }
    }
}`
    
    async get(id: string): Promise<Spellbook | null> {
        const response = await fetch(this.spellbookUrl, {
            method: "POST",
            headers: {
                Authorization: getToken()
            },
            body: JSON.stringify({
                query: this.getQuery,
                variables: {
                    id
                }
            })
        })

        const rawJson = await response.json()

        return rawJson.data.spellbook
    }

    private updateMutation = `
mutation UpdateSpellbook($id: ID!, $spellbook: SpellbookInput!) {
    updateSpellbook(
        id: $id,
        spellbook: $spellbook
    ) {
        id
        spellbook {
            ownerId
            name
            maxPrepared
            spells {
                name
                level
                school
                description
                higherLevel
                concentration
                ritual
                alwaysPrepared
            }
        }
    }
}
`

    async update(id: string, spellbook: Spellbook): Promise<Spellbook> {
        const response = await fetch(this.spellbookUrl, {
            method: "POST",
            headers: {
                Authorization: getToken()
            },
            body: JSON.stringify({
                query: this.updateMutation,
                variables: {
                    id,
                    spellbook
                }
            })
        })

        const rawJson = await response.json()

        return rawJson.data.spellbook
    }
}