import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import * as R from 'ramda';
import { Table, Row, Cell } from '../../components';
import './quest-component.css';

type Quest = {
    title: string
    status: string
    difficulty: number
    members: boolean
    userEligible: boolean
    questPoints: number
}

type QuestResponse = {
    quests: Quest[]
}

type QuestList = {
    user: string,
    quests: Quest[]
}

type QuestCell = {
    user: string
    questName: string
    status: string
    difficulty: number
    members: boolean
    userEligible: boolean
    questPoints: number
}

type QuestRow = QuestCell[]

export const QuestsComponent = () => {
    const [questLists, setQuestLists] = useState<QuestList[]>([]);

    const [users, setUsers] = useState<string[]>(['void_cosmos', 'sapphisms', 'issybelle', 'amibelle', 'aimasu', 'madidle'])
    useEffect(() => {
        const doFetch = async () => {
            const questPromises = users.map(async user => {
                const response = await fetch(`https://runescape.voidconcept.com/runemetrics/quests?user=${user}`, {
                    mode: "cors"
                })
                const responseJson: QuestResponse = await response.json()
                return {
                    user,
                    quests: responseJson.quests
                }
            })
            const quests = await Promise.all(questPromises)
            setQuestLists(quests)
        }
        doFetch().catch(console.error)
    }, [users])

    const questTable = useMemo(() => {
        const flattenedQuests = questLists.flatMap(questList => {
            return questList.quests.map(quest => {
                return {
                    user: questList.user,
                    questName: quest.title,
                    status: quest.status,
                    difficulty: quest.difficulty,
                    members: quest.members,
                    userEligible: quest.userEligible,
                    questPoints: quest.questPoints
                }
            })
        })
        return R.groupBy((quest: QuestCell) => quest.questName)(flattenedQuests)
    }, [questLists])

    return (
        <Table>
            <Row>
                <Cell></Cell>
                {users.map((user, index) => {
                    return (
                        <Cell key={index}>
                            {user}
                        </Cell>
                    )
                })}
            </Row>
            {Object.values(R.mapObjIndexed((questRows: QuestCell[], questName: string) => {
                return (
                    <Row key={questName}>
                        <Cell>
                            {questName}
                        </Cell>
                        {questRows.map(questRow => {
                            const className = getStatusClass(questRow.status)
                            return (
                                <Cell className={className}>
                                    {questRow.user} {questRow.status} {`${questRow.userEligible}`}
                                </Cell>
                            )
                        })}
                    </Row>
                )
            })(questTable))}
        </Table>
    );
}

const getStatusClass = (status: string) => {
    if (status === "COMPLETED") {
        return 'vc-status-green'
    } else if (status === "STARTED") {
        return 'vc-status-yellow'
    } else {
        return 'vc-status-red'
    }
}