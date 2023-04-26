import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkTask,
  getClosestTasks,
  selectNoteTypeAndFilter,
} from '../../redux/slices/noteSlice';

import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FavoritesSvg from '../../assets/svg/undrawheart.svg';
import AlarmedNotesSvg from '../../assets/svg/undrawalarm.svg';
import ImageNotesSvg from '../../assets/svg/undrawimages.svg';
import TasksSvg from '../../assets/svg/undrawtask.svg';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {AnimatePresence, MotiView} from 'moti';

const NoteTypeCarousels = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const homeTasks = useSelector(state => state.note.homeTasks);
  const allTasks = useSelector(state => state.note.allTasks);

  useEffect(() => {
    dispatch(getClosestTasks());
  }, [allTasks, isFocused]);

  const {width, height} = useWindowDimensions();

  const [temp, setTemp] = useState(false);
  const allTypes = [
    {
      name: 'Your\nFavorites',
      filter: 'Your Favorites',
      color: '#ff7979',
      img: (
        <FavoritesSvg
          width={width * 0.3}
          height={width * 0.4}
          style={{
            position: 'absolute',
            bottom: 25,
            right: '5%',
            resizeMode: 'contain',
          }}
        />
      ), //parent's width is width*0.4
    },
    {
      name: 'Alarmed Notes',
      filter: 'Alarmed Notes',
      color: '#3498db',
      img: (
        <AlarmedNotesSvg
          width={width * 0.3}
          height={width * 0.3}
          style={{
            position: 'absolute',
            bottom: 25,
            right: '5%',
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      name: 'Notes with Images',
      filter: 'Notes with Images',
      color: '#248a22',
      img: (
        <ImageNotesSvg
          width={width * 0.34}
          height={width * 0.34}
          style={{
            position: 'absolute',
            bottom: 25,
            right: '5%',
            resizeMode: 'contain',
          }}
        />
      ),
    },
  ];
  return (
    <View
      className="mt-4 h-64"
      style={{
        height: height * 0.36,
      }}>
      <ScrollView
        className="px-4 flex-row"
        contentContainerStyle={{gap: 16}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {/* Tasks */}
        <TouchableOpacity
          className={`rounded-3xl`}
          style={{
            width: width * 0.45,
            backgroundColor: '#903eab',
          }}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Task');
          }}>
          <Text
            className="px-5 text-white font-bold text-lg mt-6 pr-12"
            style={{lineHeight: 24}}>
            Tasks
          </Text>
          <AnimatePresence>
            {homeTasks?.length > 0 ? (
              <View
                className="items-center mt-3"
                style={{gap: 16, position: 'absolute', bottom: 25}}>
                {homeTasks?.map(
                  item =>
                    isFocused && (
                      <MotiView
                        key={item?.id}
                        style={{flex: 1}}
                        from={{
                          opacity: 0,
                          scale: 0.9,
                          translateY: 100,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          translateY: 0,
                        }}
                        transition={{
                          type: 'spring',
                          duration: 700,
                          delay: 50,
                        }}>
                        <TouchableOpacity
                          className="px-3"
                          style={{
                            width: width * 0.45,
                            opacity: item?.isDone ? 0.5 : 1,
                          }}
                          onPress={() => {
                            dispatch(checkTask(item?.id));
                          }}>
                          {/* <Text className="text-xs" style={{fontSize: 10}}>
                    {moment(item?.due_date).format('MMM Do')}
                  </Text> */}
                          <View
                            className="flex-row items-center bg-white30 py-3 px-2 rounded-full"
                            style={{gap: 8}}>
                            <MCIcons
                              name={
                                item?.isDone
                                  ? 'checkbox-marked-circle'
                                  : 'checkbox-blank-circle-outline'
                              }
                              size={22}
                              color={item?.isDone ? '#ffffff50' : '#ffffff'}
                            />
                            <Text
                              className="text-white"
                              style={{
                                textDecorationLine: item?.isDone
                                  ? 'line-through'
                                  : 'none',
                              }}>
                              {item?.text.length > 10
                                ? `${item?.text.slice(0, 12).trim()}...`
                                : item?.text}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </MotiView>
                    ),
                )}
              </View>
            ) : (
              <TasksSvg
                width={width * 0.3}
                height={width * 0.3}
                style={{
                  opacity: 1,
                  position: 'absolute',
                  bottom: 25,
                  right: '5%',
                  resizeMode: 'contain',
                }}
              />
            )}
          </AnimatePresence>
        </TouchableOpacity>
        {allTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`rounded-3xl px-5 ${
              index === allTypes?.length - 1 ? 'mr-8' : null
            }`}
            style={{width: width * 0.4, backgroundColor: item.color}}
            activeOpacity={0.8}
            onPress={() => {
              dispatch(selectNoteTypeAndFilter(item.filter));
              navigation.navigate('NoteType');
            }}>
            <Text
              className="text-white font-bold text-lg mt-6 pr-4"
              style={{lineHeight: 24}}>
              {item.name}
            </Text>

            <AnimatePresence>
              {isFocused && (
                <MotiView
                  key={item?.id}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 0,
                    margin: 0,
                    right: '5%',
                    resizeMode: 'contain',
                  }}
                  from={{
                    opacity: 0,
                    scale: 0.9,
                    translateY: 100,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    translateY: 0,
                  }}
                  transition={{
                    type: 'spring',
                    duration: 700,
                    delay: 50,
                  }}>
                  {item.img}
                </MotiView>
              )}
            </AnimatePresence>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NoteTypeCarousels;
