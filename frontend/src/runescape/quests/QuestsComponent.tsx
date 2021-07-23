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
type ClanMemberFiltered = ClanMember & {
    ignore: boolean
    hide: boolean
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

type QuestOverview = {
    members: boolean
    difficulty: QuestDifficulty
    length: string
    age: QuestAge
    questPoints: number
    series: string
    questRequirements: QuestTable
}

type QuestRow = {
    questName: string
    userProgress: QuestCell[]
    overview?: QuestOverview
}
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

type OnFetchQuestOverview = (questName: string) => void

type QuestOverviewComponentProps = {
    users: ClanMemberFiltered[]
    overview: QuestOverview
    onFetchQuestOverview: OnFetchQuestOverview
    tabLevel: number
}
const QuestOverviewComponent = ({ users, overview, tabLevel, onFetchQuestOverview }: QuestOverviewComponentProps) => {
    return (
        <div>
            <QuestTableView users={users} questTable={overview.questRequirements} tabLevel={tabLevel} onFetchQuestOverview={onFetchQuestOverview} />
        </div>
    )
}

type QuestTableRowProps = {
    users: ClanMemberFiltered[]
    questRow: QuestRow
    onFetchQuestOverview: OnFetchQuestOverview
    tabLevel?: number
}
const QuestTableRow = ({ users, questRow, tabLevel, onFetchQuestOverview }: QuestTableRowProps) => {
    const numSpaces = tabLevel || 0
    const spaces = new Array(numSpaces).fill("-")
    const questName = questRow.questName
    const [showSubquest, setShowSubquests] = useState(false)

    const onRowClicked = () => {
        if (!questRow.overview) {
            onFetchQuestOverview(questName)
            setShowSubquests(true)
        } else {
            setShowSubquests(!showSubquest)
        }
    }

    return (
        <>
            <Row onClick={onRowClicked} key={questName}>
                <Cell>
                    <a href={`https://runescape.wiki/?search=${questName}`} target="_blank">{spaces}{questName}</a>
                </Cell>
                {questRow.userProgress
                    .filter(prog => !users.find(user => prog.user === user.name)?.hide)
                    .map((questCell, index) => {
                        const { className, text } = getStatusClass(questCell.status, questCell.userEligible)
                        return (
                            <Cell className={className} key={index}>
                                {text}
                            </Cell>
                        )
                    })
                }
            </Row>
            {showSubquest && !questRow.overview && "Fetching..."}
            {showSubquest && questRow.overview && <QuestOverviewComponent users={users} overview={questRow.overview} tabLevel={numSpaces + 1} onFetchQuestOverview={onFetchQuestOverview} />}
        </>
    )
}

type QuestTableProps = {
    users: ClanMemberFiltered[]
    questTable: QuestTable
    onSortChange: (user: string) => void
    onIgnorePlayerClicked: (user: string) => void
    onHidePlayerClicked: (user: string) => void
    onFetchQuestOverview: OnFetchQuestOverview
}
const QuestTableComponent = ({ users, questTable, onSortChange, onIgnorePlayerClicked, onHidePlayerClicked, onFetchQuestOverview }: QuestTableProps) => {
    return (
        <Table>
            <Row>
                <Cell onClick={() => onSortChange("questName")} />
                {users.filter(user => !user.hide).map((user, index) => {
                    return (
                        <Cell key={index} onClick={() => onSortChange(user.name)}>
                            {user.name}
                            <div onClick={(event) => {
                                event.stopPropagation()
                                onIgnorePlayerClicked(user.name)
                            }}  >
                                <label htmlFor={`name-ignore-${user.name}`}>Ignore</label>
                                <input id={`name-ignore-${user.name}`} type="checkbox" checked={user.ignore} onChange={() => onIgnorePlayerClicked(user.name)} />
                            </div>
                            <div onClick={(event) => {
                                event.stopPropagation()
                                onHidePlayerClicked(user.name)
                            }}  >
                                <button onClick={() => onHidePlayerClicked(user.name)}>Hide</button>
                            </div>
                        </Cell>
                    )
                })}
            </Row>
            <QuestTableView users={users} questTable={questTable} onFetchQuestOverview={onFetchQuestOverview} />
        </Table >
    )
}

type QuestTableViewProps = {
    users: ClanMemberFiltered[]
    questTable: QuestTable
    onFetchQuestOverview: OnFetchQuestOverview
    tabLevel?: number
}
const QuestTableView = ({ users, questTable, tabLevel, onFetchQuestOverview }: QuestTableViewProps) => {
    const rows = questTable.map((questRow) => <QuestTableRow users={users} questRow={questRow} tabLevel={tabLevel} key={questRow.questName + tabLevel} onFetchQuestOverview={onFetchQuestOverview} />)
    return <>{rows}</>
}

export const QuestsComponent = () => {
    const [clanMembers, setClanMembers] = useState<ClanMember[]>([])
    const [users, setUsers] = useState<ClanMemberFiltered[]>([])

    const [questTable, setQuestTable] = useState<QuestTable>([]);
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

    const onHidePlayerClicked = (user: string) => {
        const newUsers = users.map(oldUser => {
            if (oldUser.name === user) {
                return {
                    ...oldUser,
                    hide: !oldUser.hide,
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

    const onUnhideAll = () => {
        const newUsers = users.map(oldUser => ({
            ...oldUser,
            hide: false
        }))
        setUsers(newUsers)
    }

    const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearch(event.target.value)
    }

    const onFetchQuestOverview: OnFetchQuestOverview = (questName: string) => {
        const run = async () => {
            const questId = encodeURIComponent(questName.toLowerCase().replaceAll(" ", "_").replaceAll("%20", "_").replace("_(miniquest)", "").replace("_(saga)", ""))
            const response = await fetch(`https://quests.voidconcept.com/quest?questId=${questId}`)
            if (response.status === 200) {
                const questResponse: APIQuest = await response.json()
                const questRequirements: QuestTable = questTable.filter(row => {
                    return questResponse.questRequirements.findIndex(requirement => requirement.name === row.questName) != -1
                })
                const overview: QuestOverview = {
                    members: questResponse.members,
                    difficulty: questResponse.difficulty,
                    length: questResponse.length,
                    age: questResponse.age,
                    questPoints: questResponse.questPoints,
                    series: questResponse.series,
                    questRequirements: questRequirements
                }
                const newQuestTable = copyRequirements(questTable, questName, overview)
                setQuestTable(newQuestTable)
            } else {
                console.log(`No quest found for ${questId}`)
            }
        }
        run().catch(console.error)
    }

    useEffect(() => {
        const doFetch = async () => {
            const clanMembers = await fetchClanMembers()
            const clanMembersIgnored = clanMembers.map(member => ({
                ignore: false,
                ...member
            })).sort((a, b) => b.name.localeCompare(a.name))
            console.log('setting clan members')
            setClanMembers(clanMembersIgnored)
        }
        doFetch().catch(console.error)
    }, [])

    useEffect(() => {
        setUsers(clanMembers.map(member => ({
            ...member,
            ignore: false,
            hide: false
        })))
    }, [clanMembers])

    useEffect(() => {
        const doFetch = async () => {
            console.log('fetching user data', clanMembers)
            const questPromises = clanMembers.map(fetchUserData)
            const questsPerUser = await Promise.all(questPromises)
            const questsByQuest = groupByQuest(questsPerUser)

            setQuestTable(questsByQuest)
        }
        doFetch().catch(console.error)
    }, [clanMembers])

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
                    <button onClick={onUnhideAll}>Unhide all</button>
                </div>
                <div>
                    <input id="search" value={search} onChange={onSearchChange} placeholder="Search" />
                </div>
            </div>
            <QuestTableComponent users={users} questTable={displayTable} onSortChange={onSortChange} onIgnorePlayerClicked={onIgnorePlayerClicked} onHidePlayerClicked={onHidePlayerClicked} onFetchQuestOverview={onFetchQuestOverview} />
        </>
    );
}

const searchTable = (search: string, questTable: QuestTable): QuestTable => {
    if (search.length === 0) return questTable

    return questTable.filter(questRow =>
        questRow.questName.toLowerCase().search(search.toLowerCase()) != -1
    )
}

const filterTable = (shouldFilterCompleted: boolean, filterUncompletable: boolean, users: ClanMemberFiltered[], questTable: QuestTable): QuestTable => {
    if (!shouldFilterCompleted && !filterUncompletable) return questTable

    return questTable.filter(questRow => !questRow.userProgress.find(questCell => {
        const matchingUser = users.find(u => u.name === questCell.user)
        return !matchingUser?.ignore && ((shouldFilterCompleted && questCell.status === QuestStatus.Completed) || (filterUncompletable && !questCell.userEligible))
    }))
}

const sortTable = (sortBy: string, sortDirection: boolean, questTable: QuestTable) => {
    if (sortBy === "none") return questTable
    return [...questTable].sort((a, b) => {
        if (sortBy === "questName") {
            const compareDirection = compareStrings(a.questName, b.questName)
            return sortDirection ? compareDirection : -compareDirection
        } else {
            const leftElement = a.userProgress.find(e => e.user === sortBy)
            const rightElement = b.userProgress.find(e => e.user === sortBy)
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

const fetchUserData = async (user: ClanMember): Promise<QuestCell[]> => {
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
    [questName: string]: QuestRow
}
const groupByQuest = (questsPerUser: QuestCell[][]): QuestRow[] => {
    const groupedQuests = questsPerUser.flat().reduce<QuestGroupReduceResults>((previous, current) => {
        const key = current.title
        const oldValue = previous[key]
        const previousProgress = oldValue?.userProgress || []
        return {
            ...previous,
            [key]: {
                questName: key,
                userProgress: [...previousProgress || [], current],
            }
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

const copyRequirements = (questTable: QuestTable, questName: string, overview: QuestOverview): QuestTable => {
    return questTable.map(row => {
        if (row.questName === questName) {
            return {
                ...row,
                overview
            }
        } else if (row.overview) {
            const newQuestReqs = copyRequirements(row.overview.questRequirements, questName, overview)
            return {
                ...row,
                overview: {
                    ...row.overview,
                    questRequirements: newQuestReqs
                }
            }
        } else {
            return row
        }
    })
}