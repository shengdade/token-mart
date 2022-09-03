import { METADATA_CID } from './config'
import { Metadata } from './types'

export async function getCollectionMetadata(): Promise<Metadata[]> {
  const URLs = Array.from(Array(20).keys()).map(
    (id) => `https://${METADATA_CID}.ipfs.nftstorage.link/${id}.json`
  )
  const responses = await Promise.all(URLs.map((url) => fetch(url)))
  const metadata = await Promise.all(
    responses.map((response) => response.json())
  )
  return metadata
}

export async function getMetadata(id: string): Promise<Metadata> {
  const URL = `https://${METADATA_CID}.ipfs.nftstorage.link/${id}.json`
  const response = await fetch(URL)
  const metadata = await response.json()
  return metadata
}
