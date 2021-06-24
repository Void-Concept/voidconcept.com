import React, { useMemo, ChangeEventHandler } from 'react';
import { useState, useEffect } from 'react';
import { Table, Row, Cell } from '../../components';
import './quest-component.css';

type ClanRank = string //TODO: make enum
type ClanMember = {
    name: string
    rank: ClanRank
    totalXp: number
    kills: number
}
type ClanMemberIgnored = ClanMember & {
    ignore: boolean
}

enum QuestStatus {
    Completed = "COMPLETED",
    Started = "STARTED",
    NotStarted = "NOT_STARTED"
}

type Quest = {
    title: string
    status: QuestStatus
    difficulty: number
    members: boolean
    userEligible: boolean
    questPoints: number
}

type QuestResponse = {
    quests: Quest[]
}

type QuestCell = {
    user: string
    title: string
    status: QuestStatus
    difficulty: number
    members: boolean
    userEligible: boolean
    questPoints: number
}

type QuestRow = QuestCell[]
type QuestTable = QuestRow[]



export type APIChildQuest = {
    name: string
    id: string | undefined
    href: string | undefined
}

export type APIChildQuestList = APIChildQuest[]

export type QuestDifficulty = 'Novice' | 'Intermediate' | 'Experienced' | 'Master' | 'Grandmaster' | 'Special'

export type QuestAge = 'Fifth Age' | 'Sixth Age' | 'Ambiguous'

export type APIQuest = {
    id: string
    name: string
    href: string
    members: boolean
    difficulty: QuestDifficulty
    length: string
    age: QuestAge
    questPoints: number
    series: string
    questRequirements: APIChildQuestList
}

type QuestRequirementComponentProps = {
    quest: APIQuest
}
const QuestRequirementComponent = ({ quest }: QuestRequirementComponentProps) => {
    return (
        <>
            {quest.questRequirements.map((requirement, index) => {
                return (
                    <div>
                        {requirement.href ?
                            <a key={index} href={`https://runescape.wiki/${requirement.href}`} target="_blank">{requirement.name}</a>
                            :
                            requirement.name
                        }

                    </div>
                )
            })}
        </>
    )
}

type QuestTableRowProps = {
    questRow: QuestRow
}
const QuestTableRow = ({ questRow }: QuestTableRowProps) => {
    const questName = questRow[0]?.title
    const [showSubquest, setShowSubquests] = useState(false)
    const [subQuests, setSubquests] = useState<APIQuest | undefined>(undefined)

    useEffect(() => {
        const run = async () => {
            if (!subQuests && showSubquest) {
                const questId = encodeURIComponent(questRow[1].title.toLowerCase().replaceAll(" ", "_").replaceAll("%20", "_").replace("_(miniquest)", "").replace("_(saga)", ""))
                const response = await fetch(`https://quests.voidconcept.com/quest?questId=${questId}`)
                if (response.status === 200) {
                    const questResponse = await response.json()
                    setSubquests(questResponse)
                } else {
                    console.log(`No quest found for ${questId}`)
                }
            }
        }
        run().catch(console.error)
    }, [showSubquest])

    return (
        <>
            <Row key={questName}>
                <Cell onClick={() => { setShowSubquests(!showSubquest) }}>
                    <a href={`https://runescape.wiki/?search=${questName}`} target="_blank">{questName}</a>
                </Cell>
                {questRow.map((questCell, index) => {
                    const { className, text } = getStatusClass(questCell.status, questCell.userEligible)
                    return (
                        <Cell className={className} key={index}>
                            {text}
                        </Cell>
                    )
                })}
            </Row>
            {showSubquest && subQuests && <QuestRequirementComponent quest={subQuests} />}
        </>
    )
}

type QuestTableProps = {
    users: ClanMemberIgnored[]
    questTable: QuestTable
    onSortChange: (user: string) => void
    onIgnorePlayerClicked: (user: string) => void
}
const QuestTableComponent = ({ users, questTable, onSortChange, onIgnorePlayerClicked }: QuestTableProps) => {
    const rows = questTable.map((questRow, index) => <QuestTableRow questRow={questRow} key={index} />)

    return (
        <Table>
            <Row>
                <Cell onClick={() => onSortChange("questName")} />
                {users.map((user, index) => {
                    return (
                        <Cell key={index} onClick={() => onSortChange(user.name)}>
                            {user.name}
                            <div onClick={(event) => {
                                event.stopPropagation()
                                onIgnorePlayerClicked(user.name)
                            }}  >
                                <label htmlFor={`name-ignore-${user.name}`}>Ignore</label>
                                <input type="checkbox" checked={user.ignore} onChange={() => onIgnorePlayerClicked(user.name)} />
                            </div>
                        </Cell>
                    )
                })}
            </Row>
            {rows}
        </Table >
    )
}

export const QuestsComponent = () => {
    const [users, setUsers] = useState<ClanMemberIgnored[]>([])

    const [questTable, setQuestTable] = useState<QuestRow[]>([]);
    const [filterCompleted, setFilterCompleted] = useState<boolean>(false);
    const [filterUnCompletable, setFilterUncompletable] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("questName")
    const [sortDirection, setSortDirection] = useState<boolean>(true)
    const [search, setSearch] = useState<string>("")

    const onFitlerComplete: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFilterCompleted(event.target.checked)
    }

    const onFitlerUncomplete: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFilterUncompletable(event.target.checked)
    }

    const onSortChange = (user: string) => {
        if (sortBy === user) {
            setSortDirection(!sortDirection)
        } else {
            setSortBy(user)
            setSortDirection(true)
        }
    }

    const onIgnorePlayerClicked = (user: string) => {
        const newUsers = users.map(oldUser => {
            if (oldUser.name === user) {
                return {
                    ...oldUser,
                    ignore: !oldUser.ignore,
                }
            }
            return oldUser
        })
        setUsers(newUsers)
    }

    const onIgnoreAll = () => {
        const newUsers = users.map(oldUser => ({
            ...oldUser,
            ignore: true
        }))
        setUsers(newUsers)
    }

    const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearch(event.target.value)
    }


    useEffect(() => {
        const doFetch = async () => {
            const clanMembers = await fetchClanMembers()
            const clanMembersIgnored = clanMembers.map(member => ({
                ignore: false,
                ...member
            })).sort((a, b) => b.name.localeCompare(a.name))
            setUsers(clanMembersIgnored)
        }
        doFetch().catch(console.error)
    }, [])

    useEffect(() => {
        const doFetch = async () => {
            const questPromises = users.map(fetchUserData)
            const questsPerUser = await Promise.all(questPromises)
            const questsByQuest = groupByQuest(questsPerUser)

            setQuestTable(questsByQuest)
        }
        doFetch().catch(console.error)
    }, [users])

    const filteredTable = useMemo(() => {
        return filterTable(filterCompleted, filterUnCompletable, users, questTable)
    }, [questTable, filterCompleted, filterUnCompletable, users])

    const sortedTable = useMemo(() => {
        return sortTable(sortBy, sortDirection, filteredTable)
    }, [filteredTable, sortBy, sortDirection])

    const searchedTable = useMemo(() => {
        return searchTable(search, sortedTable)
    }, [search, sortedTable])

    const displayTable = searchedTable

    return (
        <>
            <div>
                <div>
                    <label htmlFor="filter-complete-checkbox">Filter completed</label>
                    <input id="filter-complete-checkbox" type="checkbox" onChange={onFitlerComplete} checked={filterCompleted} />
                </div>
                <div>
                    <label htmlFor="filter-uncomplete-checkbox">Filter uncompletable</label>
                    <input id="filter-uncomplete-checkbox" type="checkbox" onChange={onFitlerUncomplete} checked={filterUnCompletable} />
                </div>
                <div>
                    <button onClick={onIgnoreAll}>Ignore all</button>
                </div>
                <div>
                    <input id="search" value={search} onChange={onSearchChange} placeholder="Search" />
                </div>
            </div>
            <QuestTableComponent users={users} questTable={displayTable} onSortChange={onSortChange} onIgnorePlayerClicked={onIgnorePlayerClicked} />
        </>
    );
}

const searchTable = (search: string, questTable: QuestTable): QuestTable => {
    if (search.length === 0) return questTable

    return questTable.filter(questRow =>
        questRow.find(questCell => {
            return questCell.title.toLowerCase().search(search.toLowerCase()) != -1
        })
    )
}

const filterTable = (shouldFilterCompleted: boolean, filterUncompletable: boolean, users: ClanMemberIgnored[], questTable: QuestTable): QuestTable => {
    if (!shouldFilterCompleted && !filterUncompletable) return questTable

    return questTable.filter(questRow => !questRow.find(questCell => {
        const matchingUser = users.find(u => u.name === questCell.user)
        return !matchingUser?.ignore && ((shouldFilterCompleted && questCell.status === QuestStatus.Completed) || (filterUncompletable && !questCell.userEligible))
    }))
}

const sortTable = (sortBy: string, sortDirection: boolean, questTable: QuestTable) => {
    if (sortBy === "none") return questTable
    return [...questTable].sort((a, b) => {
        if (sortBy === "questName") {
            const compareDirection = compareStrings(a[0].title, b[0].title)
            return sortDirection ? compareDirection : -compareDirection
        } else {
            const leftElement = a.find(e => e.user === sortBy)
            const rightElement = b.find(e => e.user === sortBy)
            if (!leftElement || !rightElement) return 0

            const compareDirection = compareElements(leftElement, rightElement)

            return sortDirection ? compareDirection : -compareDirection
        }
    })
}

const compareElements = (leftElement: QuestCell, rightElement: QuestCell) => {
    const byStatus = compareStatus(leftElement?.status, rightElement?.status)
    if (byStatus !== 0) return byStatus

    const byCanComplete = compareEligible(leftElement?.userEligible, rightElement?.userEligible)
    if (byCanComplete !== 0) return byCanComplete

    const byName = compareStrings(leftElement?.title, rightElement?.title)

    return byName
}

const compareEligible = (a: boolean, b: boolean) => {
    return a && !b ? -1 : !a && b ? 1 : 0
}
const getStatusValue = (status?: QuestStatus) => {
    switch (status) {
        case QuestStatus.Completed:
            return 2;
        case QuestStatus.Started:
            return 1;
        case QuestStatus.NotStarted:
            return 0;
        default:
            return 0;
    }
}
const compareStatus = (a: QuestStatus, b: QuestStatus) => {
    return getStatusValue(b) - getStatusValue(a)
}
const compareStrings = (a: string, b: string) => a > b ? 1 : a === b ? 0 : -1

const fetchUserData = async (user: ClanMemberIgnored): Promise<QuestCell[]> => {
    const response = await fetch(`https://runescape.voidconcept.com/userQuests?user=${user.name}`, {
        mode: "cors"
    })
    const responseJson: QuestResponse = await response.json()
    return responseJson.quests.map(quest => ({
        user: user.name,
        ...quest
    }))
}

const fetchClanMembers = async (): Promise<ClanMember[]> => {
    const url = "https://runescape.voidconcept.com/clanMembers?clanName=Beach+Peaches"
    const response = await fetch(url, {
        mode: "cors"
    })
    const csv = await response.text()
    const csvRows = csv.split("\n")
    const tableOnlyMembers = csvRows.filter(row => row.length !== 0).map(row => row.split(",")).splice(1)
    const clanMembers: ClanMember[] = tableOnlyMembers.map(row => ({
        name: row[0].replace("�", " "),
        rank: row[1],
        totalXp: parseInt(row[2]),
        kills: parseInt(row[3]),
    }))
    return clanMembers
}

type QuestGroupReduceResults = {
    [questName: string]: QuestCell[]
}
const groupByQuest = (questsPerUser: QuestCell[][]): QuestRow[] => {
    const groupedQuests = questsPerUser.flat().reduce<QuestGroupReduceResults>((previous, current) => {
        const key = current.title
        const oldValue = previous[key] || []
        return {
            ...previous,
            [key]: [...oldValue, current]
        }
    }, {})


    return Object.values(groupedQuests)
}

const getStatusClass = (status: string, canComplete: boolean) => {
    if (status === QuestStatus.Completed) {
        return {
            className: 'vc-status-green',
            text: "Completed"
        }
    } else if (status === QuestStatus.Started) {
        return {
            className: 'vc-status-yellow',
            text: "Started"
        }
    } else if (status === QuestStatus.NotStarted && canComplete) {
        return {
            className: 'vc-status-orange',
            text: "Not started"
        }
    } else {
        return {
            className: 'vc-status-red',
            text: "Cannot complete"
        }
    }
}