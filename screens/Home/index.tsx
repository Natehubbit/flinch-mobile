import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
// import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { AppContainer, maxHeight } from '../../common/styledComponents'
import CelebImage from '../../components/CelebImage'
import SectionHeader from '../../components/SectionHeader'
import { useCelebs } from '../../hooks/useCelebs'
import { useLoader } from '../../hooks/useLoader'
// import { Celeb } from '../../services/CelebService'
import { celebsActions } from '../../store/celebs'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const celebs = useCelebs()
  const { celebsLoader } = useLoader()
  useEffect(() => {
    (celebs.length < 1) &&
    dispatch(celebsActions.getCelebs())
  }, [])

  if (celebsLoader) {
    return <ActivityIndicator
      animating
    />
  }

  // const featured = celebs && celebs.slice(0, 4)

  // const renderFeatured = ({ item }:{item:Celeb}) => {
  //   return <CelebImage
  //       {...item}
  //     />
  // }

  const renderAll = () => {
    return celebs && celebs.slice(4).map(celeb => (
      <CelebImage
        key={celeb.id}
        {...celeb}
        large
      />
    ))
  }

  // const featureView = () => {
  //   return (
  //     <>
  //       <SectionHeader title='Featured' />
  //       <FlatList
  //         data={featured}
  //         horizontal
  //         showsHorizontalScrollIndicator={false}
  //         renderItem={renderFeatured}
  //         contentContainerStyle={styles.section}
  //         keyExtractor={(item) => item.id}
  //       />
  //     </>
  //   )
  // }

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
      // data={[featureView(), allView()]}
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
