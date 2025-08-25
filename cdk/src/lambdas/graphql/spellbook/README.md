Schema


| partitionKey                  | sortKey          | ownerId     | maxPrepared/name      | [spell columns] |
| ----------------------------- | ---------------- | ----------- | --------------------- | --------------- |
| app#spellbook#spellbook#${id} | owner            | ${cognosId} |                       |                 |
| app#spellbook#spellbook#${id} | attributes       |             | ${maxPrepared/name}   |                 |
| app#spellbook#spellbook#${id} | spell#${index}   |             |                       | [column values] |
