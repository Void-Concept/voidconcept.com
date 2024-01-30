import { AppSyncResolverEvent } from "aws-lambda";
import { Spellbook } from "./types";

type QuerySpellbookArgs = {
    id: String
}

export const handler = async (
    event: AppSyncResolverEvent<QuerySpellbookArgs>
): Promise<Spellbook | undefined> => {
    console.log(JSON.stringify(event))
    return undefined
}
