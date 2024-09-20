- place players to the grid (random position for both players)
- stop game after google will take necessary points
- google must jump to empty cell (if player is in the cell - jump to other cell)

- расставьте игроков по сетке (произвольная позиция для обоих игроков)
- остановите игру после того, как google наберет необходимые очки
- google должен перейти на пустую ячейку (если игрок находится в ячейке - перейти на другую ячейку)



- Create classes:
- - Position (информационный эксперт\создатель\доменно-оопшный (GRASP))
- - Google (информационный эксперт\создатель\доменно-оопшный (GRASP))
- - Settings (DI/инфраструктурный)
- - GridSettings (DI)
- - Player (like Google)

// new Game(new Settings(new GridSettings()))


// entity objects vs value objects (DDD)