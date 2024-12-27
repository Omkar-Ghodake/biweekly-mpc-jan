import React from 'react'
import { MdExitToApp } from 'react-icons/md'
import { TbShareplay } from 'react-icons/tb'

export const NAVLINKS = [
  {
    label: React.createElement(TbShareplay),
    url: '/black',
  },
  {
    label: 'Home',
    url: '/landing',
  },
  {
    label: 'Investigations',
    url: '/investigations',
  },
  {
    label: 'Bureau',
    url: '/bureau',
  },
  {
    label: React.createElement(MdExitToApp),
    url: '/exit',
  },
]
