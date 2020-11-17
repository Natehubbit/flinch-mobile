import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Divider, TouchableRipple } from 'react-native-paper'
import { useUser } from '../../hooks/useUser'
import { AltMiniLabel, Paragraph } from '../../common/styledComponents'
import Tag from '../Tag'
import { RequestStatus } from '../../types'

interface RequestCardProps {
  name:string;
  tag:RequestStatus;
  occasion:string;
  price:string;
  onPress:()=>void;
}

const RequestCard: React.FC<RequestCardProps> = ({
  name,
  tag,
  occasion,
  price,
  onPress
}) => {
  const { imageUrl: uri } = useUser()
  return <View style={styles.container}>
        <TouchableRipple onPress={onPress}>
            <>
                <View style={styles.top}>
                    <View style={styles.user}>
                        <Image
                            source={{ uri }}
                            style={styles.image}
                        />
                        <View style={styles.label}>
                            <AltMiniLabel>
                                {name}
                            </AltMiniLabel>
                        </View>
                    </View>
                    <View style={styles.tagContainer}>
                        <Tag
                            label={tag}
                        />
                    </View>
                </View>
                <Divider/>
                <View style={styles.bottom}>
                    <View>
                        <Paragraph style={styles.bottomLabel}>
                            Occasion:
                            <Paragraph style={styles.bottomText}>
                                {occasion}
                            </Paragraph>
                        </Paragraph>
                    </View>
                    <View>
                        <Paragraph style={styles.bottomText}>
                            {price}
                        </Paragraph>
                    </View>
                </View>
            </>
        </TouchableRipple>
    </View>
}

const styles = StyleSheet.create({
  container: {
    height: 76,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 13,
    backgroundColor: '#fff',
    elevation: 2,
    overflow: 'hidden'
  },
  top: {
    height: '60%',
    paddingHorizontal: 13,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row'
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 100
  },
  user: {
    flexDirection: 'row'
  },
  label: {
    marginLeft: 13,
    justifyContent: 'center'
  },
  tagContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    height: '40%',
    paddingHorizontal: 13,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomLabel: {
    color: 'rgba(0,0,0,0.5)'
  },
  bottomText: {
    color: '#000'
    // fontWeight:'bold'
  }
})

export default RequestCard
