import React, { useState } from 'react'
import { View } from 'react-native'
import SnapCarousel, { Pagination } from 'react-native-snap-carousel'
import { maxWidth, Paragraph } from '../../common/styledComponents'

interface CarouselProps {
    data:[];
    items:[];
    itemWidth:number;
    sliderHeight:number
}

const Carousel: React.FC<CarouselProps> = ({
  data
}) => {
  const [index, setIndex] = useState(0)
  return <View>
        <SnapCarousel
            // pagingEnabled
            autoplay
            loop
            loopClonesPerSide={1}
            itemHeight={100}
            enableSnap={false}
            onSnapToItem={index => setIndex(index)}
            itemWidth={maxWidth * 0.5}
            sliderHeight={100}
            sliderWidth={maxWidth}
            containerCustomStyle={{ height: 100, width: 100 }}
            data={data || [1, 2, 3, 4]}
            renderItem={({ item }) => <Paragraph black>{item}</Paragraph>}
        />
        <Pagination
              dotsLength={4}
              activeDotIndex={index}
              containerStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                paddingVertical: 0
              }}
              dotStyle={{

                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
    </View>
}

export default Carousel
