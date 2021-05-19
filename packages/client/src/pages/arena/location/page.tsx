import React from "react"
import styled from "styled-components"
import { QuestStates } from "@mobile-fight/typings"
import { useParams } from "react-router"
import { useGate, useStore } from "effector-react"
import { ArenaTemplate } from "@mobileFight/ui/templates"
import { Loader } from "@mobileFight/ui/organisms"
import { ArenaFooter, LocationPreview, SimpleScroll } from "@features/arena"
import { List } from "@features/common"
import { Button, spriteIcon, Separator } from "@mobileFight/ui/atoms"
import locationPreview from "@assets/location.jpg"
import { useMemoryNavigator, routePaths } from "@lib/histories"
import { gate, $location } from "./model"

const HuntingButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 96%;
  margin-left: 2%;
  margin-top: 5px;

  > button {
    width: 46%;
  }
`

const LocationsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 15px;
  justify-content: center;
`

const LocationItem = styled.li`
  display: flex;
  height: 30px;
  align-items: center;
  padding: 0 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.hovered};
  }
`

const LocationBody = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0 15px;
  flex: 1 1 auto;

  > ${LocationItem} {
    margin-bottom: 10px;
    user-select: none;
    cursor: pointer;
  }
`

const LocationItemLeftIcon = styled.div`
  margin-right: 15px;
`

const QuestsCounter = styled.span<{ questType: QuestStates }>`
  color: ${(props) => props.theme.colors.quests[props.questType]};
`

const locations = [
  "Тракт",
  "Забкое Ущелье",
  "Поместьме Раввика",
  "Слободка",
  "Коллектор",
  "Верхний Город",
]

function renderQuestsCounter(counter: number, questType: QuestStates) {
  return <QuestsCounter questType={questType}>{counter}</QuestsCounter>
}

export function LocationPage() {
  const navigation = useMemoryNavigator()
  const { id } = useParams() as { id: string }
  const location = useStore($location)

  useGate(gate, id)

  if (!location) {
    return null
  }

  return (
    <ArenaTemplate footer={<ArenaFooter />}>
      <>
        <LocationPreview
          locationImage={locationPreview}
          locationName={location.location.name}
        />
        <HuntingButtonsWrapper>
          <Button
            primary
            onClick={() => {
              navigation.navigate(routePaths.hunting_list)
            }}
          >
            Охота
          </Button>
          <Button
            primary
            onClick={() => {
              navigation.navigate(routePaths.duels)
            }}
          >
            Дуэли
          </Button>
        </HuntingButtonsWrapper>
        <LocationsWrapper>
          <SimpleScroll>
            <LocationBody>
              <LocationItem
                onClick={() => {
                  navigation.navigate(routePaths.quests)
                }}
              >
                <LocationItemLeftIcon>
                  <spriteIcon.component
                    icon={spriteIcon.indexes.location.quest}
                    type="location"
                  />
                </LocationItemLeftIcon>
                Задания ({renderQuestsCounter(1, QuestStates.active)}/
                {renderQuestsCounter(2, QuestStates.available)}/
                {renderQuestsCounter(0, QuestStates.completed)})
              </LocationItem>
              <Separator w="86%" />
              <List
                extracKey={(it) => it.id.toString()}
                data={location.children}
                renderRow={(it, index) => (
                  <>
                    <LocationItem
                      onClick={() => {
                        navigation.navigate(`/location/${it.id}`)
                      }}
                    >
                      <LocationItemLeftIcon>
                        <spriteIcon.component
                          icon={spriteIcon.indexes.location.pointer}
                          type="location"
                        />
                      </LocationItemLeftIcon>
                      {it.name}
                    </LocationItem>
                    {index < locations.length - 1 && <Separator w="86%" />}
                  </>
                )}
              />
            </LocationBody>
          </SimpleScroll>
        </LocationsWrapper>
      </>
    </ArenaTemplate>
  )
}
