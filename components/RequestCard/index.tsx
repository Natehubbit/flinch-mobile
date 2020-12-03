import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Divider, TouchableRipple } from 'react-native-paper'
import { AltMiniLabel, Paragraph } from '../../common/styledComponents'
import Tag from '../Tag'
import { RequestStatus } from '../../types'
import { theme } from '../../config/theme'

interface RequestCardProps {
  celeb:string;
  imageUrl:string;
  tag:RequestStatus;
  occasion:string;
  price:string;
  recipient:string;
  date:string;
  onPress:()=>void;
}

const RequestCard: React.FC<RequestCardProps> = ({
  celeb,
  tag,
  occasion,
  imageUrl: uri,
  price,
  recipient,
  date,
  onPress
}) => {
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
                                {celeb}
                            </AltMiniLabel>
                            <Paragraph black style={[styles.bottomLabel, styles.mini]}>
                              For {recipient}
                            </Paragraph>
                            <Paragraph black style={[styles.bottomLabel, styles.mini]}>
                              {date}
                            </Paragraph>
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
                              {'\t'}{occasion}
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
    height: 100,
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
    height: 40,
    width: 40,
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
  occasion: {
    color: theme.colors.primary
  },
  bottomText: {
    color: '#000'
    // fontWeight:'bold'
  },
  mini: {
    fontSize: 12
  }
})

export default RequestCard
