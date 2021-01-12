import React, { useEffect } from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { AppContainer, maxHeight } from '../../common/styledComponents'
import CelebImage from '../../components/CelebImage'
import SectionHeader from '../../components/SectionHeader'
import { theme } from '../../config/theme'
import { useCelebs } from '../../hooks/useCelebs'
import { useLoader } from '../../hooks/useLoader'
import { celebsActions } from '../../store/celebs'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const celebs = useCelebs()
  const { celebsLoader } = useLoader()
  useEffect(() => {
    (celebs.length < 1) &&
    dispatch(celebsActions.getCelebs())
  }, [])

  const onRefresh = () => {
    dispatch(celebsActions.getCelebs())
  }

  const renderAll = () => {
    return celebs && celebs.map(celeb => (
      <CelebImage
        key={celeb.id}
        {...celeb}
        large
      />
    ))
  }

  const allView = () => {
    return (
      <>
        <SectionHeader title='Celebrities' />
        <View style={styles.allSection}>
          {renderAll()}
        </View>
      </>
    )
  }

  const renderViews = ({ item }:{item:any}) => {
    return item
  }

  return <View>
    <AppContainer
      refreshControl={<RefreshControl
        refreshing={celebsLoader}
        onRefresh={onRefresh}
        colors={[theme.colors.primary]}
      />}
      data={[allView()]}
      renderItem={renderViews}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {

  },
  section: {
    paddingVertical: 15,
    flexDirection: 'row',
    height: maxHeight * 0.25,
    paddingLeft: 12
  },
  allSection: {
    paddingTop: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12
  }
})

export default Home
