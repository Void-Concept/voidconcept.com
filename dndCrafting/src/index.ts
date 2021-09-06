import * as fs from 'fs';
import * as path from 'path';

const rarities = [
    "Trivial",
    "Common",
    "Uncommon",
    "Rare",
    "Very Rare",
    "Legendary"
] as const

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never

type Rarities = ElementType<typeof rarities>

type CraftingMaterial = {
    name: string,
    rarity: Rarities,
    usedFor: string,
    price: string
}

type CraftingTable = {
    [category: string]: CraftingMaterial[] | undefined
}

const parseMaterials = (line: string): CraftingMaterial => {
    const rarity = rarities.find(rarity => line.includes(rarity))
    if (!rarity) throw new Error("found rarity no longer found")
    const rarityIndex = line.lastIndexOf(rarity)

    const name = line.substring(0, rarityIndex - 1)
    const usedForStart = rarityIndex + rarity.length + 1

    const usedForAndPrice = line.substring(usedForStart)
    const priceIndex = usedForAndPrice.search(/[0-9]/)
    const usedFor = usedForAndPrice.substring(0, priceIndex - 1)
    const price = usedForAndPrice.substring(priceIndex)

    return {
        name,
        rarity,
        usedFor,
        price
    }
}

const run = async () => {
    const materialTable = fs.readFileSync(path.resolve(__dirname, "materialTable.txt"), {
        encoding: "utf8"
    })
    const tableLines = materialTable
        .split("\n")
        .filter(line => line !== "Materials Rarity Used For Price")

    type CraftingTableAcc = {
        currentCategory: string
        craftingTable: CraftingTable
    }
    const { craftingTable } = tableLines.reduce<CraftingTableAcc>((previous, current) => {
        if (!!rarities.find(rarity => current.includes(rarity))) {
            const previousMaterials = previous.craftingTable[previous.currentCategory] || []
            const newMaterials = [...previousMaterials, parseMaterials(current)]

            return {
                ...previous,
                craftingTable: {
                    ...previous.craftingTable,
                    [previous.currentCategory]: newMaterials
                }
            }
        } else {
            return {
                ...previous,
                currentCategory: current
            }
        }
    }, {
        currentCategory: "",
        craftingTable: {}
    })

    console.log(JSON.stringify(craftingTable))
}

run().catch(console.error)